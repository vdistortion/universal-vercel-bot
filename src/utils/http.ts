export async function http<T, P = null>(url: string, params?: P): Promise<T> {
  const search = params ? '?' + new URLSearchParams(params).toString() : '';
  const response = await fetch(url + search);
  return response.json();
}
