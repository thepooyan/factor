import { useQuery, useQueryClient } from "@tanstack/solid-query"

type queryKey = (string | boolean | number)[]

export const makeQuery = <T>(fn: ()=>Promise<T>, key: queryKey) => (() => {
  const obj = () =>
    useQuery(() => ({
      queryKey: key,
      queryFn: fn
    }))
  obj.key = key
  return obj
})()

export const useInvalidate = () => {
  const qc = useQueryClient()

  return async (key: queryKey) => {
    await qc.invalidateQueries({queryKey: key})
  }
}
