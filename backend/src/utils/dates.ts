import { parse } from 'date-fns'
export const parsedDate = (str: string): Date => parse(str, 'dd/MM/yyyy', new Date())