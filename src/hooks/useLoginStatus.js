export default function useLoginStatus() {
  if (localStorage.getItem("auth_token")) return true;

  return false;
}
