interface ApiOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: Record<string, unknown> | FormData;
  isFormData?: boolean;
  isResponseJSON?: boolean;
}

export async function API({
  url,
  method = "GET",
  body,
  isFormData = false,
  isResponseJSON = true,
}: ApiOptions) {
  const options: RequestInit = {
    method,
    headers: {
      Accept: "application/json",
    },
  };

  if (!isFormData) {
    (options.headers as Record<string, string>)["Content-Type"] = "application/json";
  }

  if (body) {
    options.body = isFormData ? (body as FormData) : JSON.stringify(body);
  }

  const res = await fetch(url, options);

  if (!res.ok) {
    let message = "Request failed";

    try {
      const data = await res.json();
      message = data.message || message;
    } catch {}

    throw new Error(message);
  }

  return isResponseJSON ? await res.json() : res;
}
