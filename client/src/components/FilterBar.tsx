interface FilterBarProps {
  status: string;
  onStatusChange: (val: string) => void;
  sort: string;
  onSortChange: (val: string) => void;
}

const FilterBar = ({ status, onStatusChange, sort, onSortChange }: FilterBarProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="select select-bordered w-full bg-base-100 shadow-sm focus:select-primary"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="expired">Expired</option>
      </select>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="select select-bordered w-full bg-base-100 shadow-sm focus:select-primary"
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
        <option value="clicks">Most Clicked</option>
      </select>
    </div>
  );
};

export default FilterBar;