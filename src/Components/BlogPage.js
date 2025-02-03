import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/FoodBlog.css";

const FoodBlog = () => {
  return (
    <div className="container food-blog-container">
      <h1 className="text-center blog-title">Welcome to Our Food Blog</h1>
      <p className="intro-text text-center">
        Explore delicious recipes, honest restaurant reviews, trending food topics, and expert kitchen hacks to enhance your culinary experience.
      </p>
      
      {/* Featured Recipes */}
      <section className="featured-recipes">
        <h2>Featured Recipes</h2>
        <div className="row">
          <div className="col-md-4 recipe-card">
          <img src="recipe1.jpg" alt="Delicious Spaghetti Carbonara on a plate" className="img-fluid" />            <h4>Spaghetti Carbonara</h4>
            <p>A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.</p>
            <button className="btn btn-primary">Read More</button>
          </div>
          <div className="col-md-4 recipe-card">
          <img src="recipe2.jpg" alt="Crispy Avocado Toast with seasonings" className="img-fluid" />
          <h4>Avocado Toast</h4>
            <p>A healthy and delicious breakfast option topped with fresh avocado and seasonings.</p>
            <button className="btn btn-primary">Read More</button>
          </div>
          <div className="col-md-4 recipe-card">
          <img src="recipe3.jpg" alt="Rich and gooey Chocolate Lava Cake" className="img-fluid" />
          <h4>Chocolate Lava Cake</h4>
            <p>A rich and gooey chocolate dessert that’s perfect for any occasion.</p>
            <button className="btn btn-primary">Read More</button>
          </div>
        </div>
      </section>
      
      {/* Restaurant Reviews */}
            <section className="restaurant-reviews">
        <h2>Restaurant Reviews</h2>
        <p>Discover the best places to eat in different cities, rated based on taste, ambiance, and service.</p>
        <ul className="list-unstyled">
            <li><strong>Le Petit Bistro</strong> - A cozy French restaurant with amazing croissants. ⭐⭐⭐⭐⭐</li>
            <li><strong>Spice Avenue</strong> - Authentic Indian flavors in the heart of the city. ⭐⭐⭐⭐</li>
            <li><strong>Sushi Zen</strong> - The best sushi experience with fresh ingredients. ⭐⭐⭐⭐⭐</li>
        </ul>
        </section>

      
      {/* Food Tips & Hacks */}
      <section className="food-tips">
        <h2>Food Tips & Hacks</h2>
        <ul>
          <li>Use frozen grapes instead of ice cubes to chill wine without dilution.</li>
          <li>Store herbs in ice cube trays with olive oil for easy cooking.</li>
          <li>For a fluffier omelet, add a splash of milk to the eggs before whisking.</li>
        </ul>
      </section>
      
      {/* Trending Food Topics */}
      <section className="trending-food">
        <h2>Trending Food Topics</h2>
        <p>Stay updated with the latest food trends like viral TikTok recipes, sustainable eating, and exotic ingredients.</p>
      </section>
      
      {/* User Interaction */}
      <section className="user-interaction">
        <h2>Join the Conversation</h2>
        <p>Leave a comment below or submit your favorite recipe to be featured on our blog.</p>
        <textarea className="form-control" placeholder="Write a comment..."></textarea>
        <button className="btn btn-success mt-2">Submit Comment</button>
        <button className="btn btn-warning mt-2">Submit Your Recipe</button>
      </section>
    </div>
  );
};

export default FoodBlog;
