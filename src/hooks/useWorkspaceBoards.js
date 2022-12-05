import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function useWorkspaceBoards(workspaceId) {
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!workspaceId) return;
    setIsLoading(true);

    axios
      .get(`/workspace/${workspaceId}/boards`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setBoards(res.data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  }, [workspaceId]);

  return [boards, isLoading];
}
