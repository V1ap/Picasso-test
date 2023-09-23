import { Route, Routes } from "react-router-dom";
import Post from "src/pages/post/ui";
import List from "src/pages/list/ui";

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/post/:id" element={<Post />} />
    </Routes>
  );
};

export default Routing;
