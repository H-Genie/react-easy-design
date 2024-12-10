import "./LoaderFullScreen.css"

export default function LoaderFullScreen() {
  return (
    <section className="loader-dim">
      <div className="loader">
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
      </div>
    </section>
  )
}
