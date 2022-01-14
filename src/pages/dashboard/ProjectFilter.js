const filterList = ['all','mine','development','design','marketing','sales']

export default function ProjectFilter({currentFilter, changeFilter}) { 
 
  return (
    <div className="project-filter">
      <nav>
      <p>Filtered by:</p>
        {filterList.map((f)=> (
          <button 
            key={f}
            onClick={()=> changeFilter(f)}
            className={currentFilter === f ? 'active': ''}
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  ) 
}