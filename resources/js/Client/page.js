import { useEffect } from "react";

const Page = (props) => {
  useEffect(() => {
    document.title = props.title ? "Keina Beauty - " + props.title : "Keina Beauty";
  }, [props.title]);
  return props.children;
};

export default Page;
