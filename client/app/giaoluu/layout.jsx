import Postprovide from "@/hooks/Postprovide";
import React from "react";
export const metadata = {
  title: "Giao Lưu",
};
function LayoutPage({ children }) {
  return (
    <div>
      <Postprovide>{children}</Postprovide>
    </div>
  );
}

export default LayoutPage;
