import { CATS } from "../App";
import "./Filter.css";

function Filter({ filter, setFilter }) {
  return (
    <div className="filter">
      <button
        className={
          filter === "All"
            ? "active-filter"
            : ""
        }
        onClick={() => setFilter("All")}
      >
        All
      </button>

      {CATS.map((cat) => (
        <button
          key={cat}
          className={
            filter === cat
              ? "active-filter"
              : ""
          }
          onClick={() => setFilter(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default Filter;