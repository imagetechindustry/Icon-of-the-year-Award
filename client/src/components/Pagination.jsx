export default function Pagination({ page, setPage, total }) {
  return (
    <div className="flex gap-4 justify-center mt-6">
      <button disabled={page===1} onClick={()=>setPage(page-1)}>Prev</button>
      <span>{page}</span>
      <button disabled={page===total} onClick={()=>setPage(page+1)}>Next</button>
    </div>
  )
}
