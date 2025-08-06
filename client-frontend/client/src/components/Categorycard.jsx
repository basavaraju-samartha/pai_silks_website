import './Categorycard.css'

export default function CategoryCard({ name, image }) {
  return (
    <div className="category-card" style={{ backgroundImage: `url(${image})` }}>
      <div className="category-label"><h2>{name}</h2></div>
    </div>
  );
}