export interface IBuscado {
  id: number
  nombre: string
  apellidos: string
  descripcion: string
  recompensa: string
  categoriaId: number
  tipoPeligroId: number
}

export type newBuscado = Omit<IBuscado, 'id'>
export type responseBuscado = Omit<IBuscado, 'categoriaId' | 'tipoPeligroId'>
