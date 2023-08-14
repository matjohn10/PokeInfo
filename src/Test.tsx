import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Test = () => {
  const { data } = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3000/test");
      return data;
    },
  });
  if (typeof data === "undefined") return <div>There is error</div>;
  return (
    <div>
      {data.Bug["Strong attack"].map((item: string) => <div>{item}</div>) || 0}
    </div>
  );
};

export default Test;
