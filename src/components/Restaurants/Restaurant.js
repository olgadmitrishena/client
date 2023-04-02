import './Restaurants.css';

import React, { useEffect, useState } from 'react';

import { API_BASE_URL } from '../../config';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Restaurant = () => {
	const [restaurant, setRestaurant] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		const fetchRestaurant = async () => {
			try {
				const response = await axios.get(`${API_BASE_URL}/${id}`);
				setRestaurant(response.data);
			} catch (error) {
				console.error('Error fetching restaurant:', error);
			}
		};

		fetchRestaurant();
	}, [id]);

	if (!restaurant) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<div className="container mt-4 mb-4">
				<div
					className="col-sm-12 shadow p-5 px-4 mb-4 rounded restaurant-bg"
					style={{
						backgroundImage: `url(${restaurant.headerImage})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
					}}>
					<div className="col-12 mt-5 mb-5">
						<div className="mb-3">
							<Link to="/" className="nav-link fw-bold text-white" aria-current="page">
								&larr;&nbsp;back to all Restaurants
							</Link>
						</div>

						<h1 className="display-5 mb-3 fw-bold text-white">{restaurant.name}</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6 col-sm-12">
						<div className="card">
							<div className="card-body">
								<h3 className="card-title">Information</h3>
								<div className="card-text">
									<p className="mb-2">
										<span className="fw-bold">Cuisine: </span>
										{restaurant.cuisine}
									</p>
									<p className="mb-2">
										<span className="fw-bold">Address: </span>
										{restaurant.address.street}, {restaurant.address.city}, {restaurant.address.state}, {restaurant.address.zip}
									</p>
									<p className="mb-2">
										<span className="fw-bold">Working Days: </span>
										{restaurant.workingDays.join(', ')}
									</p>
									<p className="mb-2">
										<span className="fw-bold">Working Hours: </span>
										{restaurant.workingHours.from} - {restaurant.workingHours.to}
									</p>
									<p className="mb-2">
										<span className="fw-bold">Phone: </span>
										{restaurant.contactInfo.phone}
									</p>
									<p className="mb-2">
										<span className="fw-bold">Email: </span>
										{restaurant.contactInfo.email}
									</p>
									<div className="mb-2">
										<span className="fw-bold">Rating: </span>
										<StarRating rating={restaurant.rating} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container mb-4">
				<h2 className="mt-4">Dishes</h2>
				<div className="row">
					{restaurant.dishes.map((dish) => (
						<div key={dish._id} className="col-md-4">
							<div className="card mt-3">
								<img src={dish.image} alt={dish.name} className="card-img-top" />
								<div className="card-body">
									<h4 className="card-title">{dish.name}</h4>
									<p className="card-text">
										<span className="fw-bold">Price: </span>${dish.price}
										<br />
										<span className="fw-bold">Description: </span>
										{dish.description}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default Restaurant;
