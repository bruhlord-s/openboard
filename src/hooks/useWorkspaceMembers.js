import axios from "axios";
import { useEffect, useState } from "react";

export default function useWorkspaceMembers(workspaceId) {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!workspaceId) return;
    setIsLoading(true);

    axios
      .get(`/workspace/${workspaceId}/members`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setMembers(res.data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  }, [workspaceId]);

  return [members, isLoading];
}
