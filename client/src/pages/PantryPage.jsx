import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    fetchPantryItems,
    addPantryItem,
    deletePantryItem,
} from '../features/pantry/pantrySlice';
import {logout} from '../features/auth/authSlice';

const PantryPage = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {items, status} = useSelector((state)=>state.pantry);
    const {user} = useSelector((state)=>state.auth);
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');

    useEffect(()=>{
        dispatch(fetchPantryItems());
    }, [dispatch]);
    const handleAddItem = (e)=>{
        e.preventDefault();
        if(!itemName) return;
        dispatch(addPantryItem({name: itemName, quantity: itemQuantity || '1 unit'}));
        setItemName('');
        setItemQuantity('');
    }
    const handleDeleteItem = (id)=>{
        dispatch(deletePantryItem(id));
    }
    const handleLogout = ()=>{
        dispatch(logout());
        navigate('/login');
    }
    return (
        <div className="min-h-screen bg-zinc-600">
            <header className="bg-yellow-100 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">
                    {user?.username}
                </h1>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >Logout</button>
                </div>
            </header>

            <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <h2 className="text-xl font-semibold mb-4">Add a New Item</h2>
                    <form onSubmit={handleAddItem} className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Item name (e.g., Chicken Breast)"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            className="flex-grow px-3 py-2 border rounded-lg focus:outline-none"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Quantity (e.g., 500g)"
                            value={itemQuantity}
                            onChange={(e) => setItemQuantity(e.target.value)}
                            className="sm:w-48 px-3 py-2 border rounded-lg focus:outline-none"
                        />
                        <button
                        type="submit"
                        className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                        Add Item
                        </button>
                    </form>
                </div>

                {/* Pantry Items List */}
                <div className="bg-yellow-100 rounded-lg shadow">
                <ul className="divide-y divide-gray-200">
                    {status === 'loading' && <li className="p-4 text-center">Loading items...</li>}
                    {status === 'succeeded' && items.length === 0 && (
                    <li className="p-4 text-center text-gray-500">Your pantry is empty. Add an item to get started!</li>
                    )}
                    {status === 'succeeded' &&
                    items.map((item) => (
                        <li key={item._id} className="p-4 flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-lg">{item.name}</p>
                            <p className="text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <button
                            onClick={() => handleDeleteItem(item._id)}
                            className="px-4 py-2 text-sm rounded-md text-white bg-red-600 hover:bg-red-700 font-medium"
                        >
                            Remove
                        </button>
                        </li>
                    ))}
                </ul>
                </div>
            </main>
    </div>
    )
}
export default PantryPage;