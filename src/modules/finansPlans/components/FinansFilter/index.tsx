import { Input } from "@app/components";
import { Search } from "@app/assets";

const Index = () => {
  return (
    <div className="flex items-center justify-between gap--3xl">
      <Input id="search" placeholder="Search..." icon={<Search />} />
    </div>
  );
};

export default Index;
