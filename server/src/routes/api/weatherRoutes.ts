import { Router, type Request, type Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  // TODO: save city to search history
  const { city } = req.body;
  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    const weatherData = await WeatherService.getWeatherForCity(city);
    await HistoryService.addCity(city);
    return res.json(weatherData);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

// TODO: GET search history
router.get('/history', async (_req: Request, _res: Response) => {});
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});
// * BONUS TODO: DELETE city from search history

router.delete('/history/:id', async (_req: Request, _res: Response) => {});
router.delete('/history/:id', async (_req: Request, res: Response) => {
  const { id } = _req.params;
  try {
    await HistoryService.removeCity(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete search history' });
  }
});
export default router;
