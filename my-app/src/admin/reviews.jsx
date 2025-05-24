'use client';
import React, { useState } from 'react';
import AdminNav from '../components/AdminNav';

export default function ReviewMonitoringPage() {
  const [reviews, setReviews] = useState([
    { id: 1, user: 'John Doe', mechanic: 'Mechanic A', rating: 5, comment: 'Excellent service!', replied: false, replyMessage: '' },
    { id: 2, user: 'Jane Smith', mechanic: 'Mechanic B', rating: 3, comment: 'Okay experience.', replied: true, replyMessage: 'Thank you for your feedback!' },
    { id: 3, user: 'Sam Lee', mechanic: 'Mechanic A', rating: 1, comment: 'Very bad experience.', replied: false, replyMessage: '' },
  ]);

  const [filter, setFilter] = useState('All');
  const [replyInputs, setReplyInputs] = useState({});

  const filteredReviews =
    filter === 'All' ? reviews : reviews.filter((rev) => rev.mechanic === filter);

  const handleDelete = (id) => {
    setReviews((prev) => prev.filter((rev) => rev.id !== id));
  };

  const handleReply = (id) => {
    setReviews((prev) =>
      prev.map((rev) =>
        rev.id === id
          ? { ...rev, replied: true, replyMessage: replyInputs[id] || '' }
          : rev
      )
    );
    setReplyInputs((prev) => ({ ...prev, [id]: '' }));
  };

  const uniqueMechanics = [
    'All',
    ...new Set(reviews.map((rev) => rev.mechanic)),
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 pl-[260px]">
        <AdminNav />
      <h1 className="text-3xl mb-6 text-gray-800">Review Monitoring</h1>

      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Mechanic:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          {uniqueMechanics.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col gap-2 border rounded-lg p-4 bg-white shadow-md"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{review.user}</h2>
                <p className="text-sm text-gray-600">Mechanic: {review.mechanic}</p>
              </div>
              <div className="text-black">Rating: {review.rating} ★</div>
            </div>

            <p className="text-gray-700">{review.comment}</p>

            {review.replied && review.replyMessage && (
              <div className="bg-orange-50 p-2 border-l-4 border-[#ed832d] text-sm text-[#ed832d]">
                <strong>Reply:</strong> {review.replyMessage}
              </div>
            )}

            {!review.replied && (
              <div className="flex flex-col gap-2">
                <textarea
                  className="w-full p-2 border rounded"
                  rows="2"
                  placeholder="Write a reply..."
                  value={replyInputs[review.id] || ''}
                  onChange={(e) =>
                    setReplyInputs((prev) => ({ ...prev, [review.id]: e.target.value }))
                  }
                />
                <button
                  onClick={() => handleReply(review.id)}
                  className="self-start px-4 py-1 bg-black hover:bg-[#ed832d] hover:transition-all duration-300 ease-in-out text-white rounded"
                >
                  Submit Reply
                </button>
              </div>
            )}

            <div className="flex justify-between items-center mt-2">
              <div className="text-sm text-gray-500">
                {review.replied ? 'Replied' : 'Not Replied'}
              </div>
              <button
                onClick={() => handleDelete(review.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 hover:transition-all duration-300 ease-in-out"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
