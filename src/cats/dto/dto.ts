export class CreateCatDto {
  name: string;
  age: string;
  breed: string;
}

export class UpdateCatDto {
  name?: string;
  age?: string;
  breed?: string;
}
