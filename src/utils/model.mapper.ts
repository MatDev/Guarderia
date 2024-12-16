
// se crea un model mapper generico para mapear los datos de la base de datos a los modelos de la aplicacion, aunque se instancia en el servicio, se puede instanciar en cualquier parte de la aplicacion

export class ModelMapper {
  // funcion de entity a dto
  public entityToDto<T>(entity: any, dto: T): T {
    for (const key in dto) {
      dto[key] = entity[key];
    }
    return dto;
  }

  // funcion de dto a entity
  public dtoToEntity<T>(dto: T, entity: any): any {
    for (const key in dto) {
      entity[key] = dto[key];
    }
    return entity;
  }
}