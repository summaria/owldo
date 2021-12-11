import React, { useEffect } from "react";

const Summary = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState("");
  useEffect(() => {}, []);
  return <div>{summary}</div>;
};

export default Summary;
