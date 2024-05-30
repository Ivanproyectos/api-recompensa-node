export interface IBuscado {
  id: number
  nombre: string
  apellidos: string
  descripcion: string
  recompensa: string
  alias: string
  categoriaId: number
  tipoPeligroId: number
  image: string
}

export type newBuscado = Omit<IBuscado, 'id'>
export type responseBuscado = Omit<IBuscado, 'categoriaId' | 'tipoPeligroId'>
