import * as fs from 'fs';


// TODO: Define a City class with name and id properties

// TODO: Complete the HistoryService class
class City {
  constructor(public id: string, public name: string) {}
}

class HistoryService {
  filePath= "../../db/db.json";
  private async read(): Promise<City[]> {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  private async write(cities: City[]): Promise<void> {
    const data = JSON.stringify(cities, null, 2);
    await fs.promises.writeFile(this.filePath, data, 'utf-8');
  }

  async getCities(): Promise<City[]> {
    return await this.read();
  }

  async addCity(name: string): Promise<void> {
    const cities = await this.read();
    const id = (cities.length + 1).toString();
    const newCity = new City(id, name);
    cities.push(newCity);
    await this.write(cities);
  }

  async removeCity(id: string): Promise<void> {
    let cities = await this.read();
    cities = cities.filter(city => city.id !== id);
    await this.write(cities);
  }
}


export default new HistoryService();
