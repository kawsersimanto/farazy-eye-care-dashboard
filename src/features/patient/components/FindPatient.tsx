import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";

export const FindPatient = () => {
  return (
    <div className="max-w-4xl mx-auto px-10">
      <InputGroup className="">
        <InputGroupInput
          placeholder="Search"
          // value={globalFilter}
          // onChange={(e) => setGlobalFilter(e.target.value)}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};
