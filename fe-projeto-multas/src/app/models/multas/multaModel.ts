export class Multa {
  constructor(
    public multaId: number,
    public numeroAIT: string,
    public codigoInfracao: string,
    public dataHoraInfracao: Date,
    public placaVeiculo: string
  ) { }
}