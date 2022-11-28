export default function updateAxiosHeaders() {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("auth_token")}`;
}
