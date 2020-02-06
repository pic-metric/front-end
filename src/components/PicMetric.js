import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const fakeData = [
	{
		id: 1,
		image_url: 'https://awoiaf.westeros.org/images/d/d2/Jon_snow_by_teiiku.jpg',
		attributes: ['Jon Snow', 'Ghost', 'House Stark']
	},
	{
		id: 2,
		image_url:
			'https://awoiaf.westeros.org/images/3/3f/MKomarck_AryaDragonSkulls.jpg',
		attributes: ['Arya', 'Dragons', "King's Landing", 'House Stark']
	},
	{
		id: 3,
		image_url:
			'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0e491a76-9764-4407-a0e6-dd5eccb7e94d/d4coc07-172ed6e6-b62e-4d08-9b4f-260d859c4977.jpg/v1/fill/w_900,h_577,q_75,strp/jaime_lannister_by_teiiku-d4coc07.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi8wZTQ5MWE3Ni05NzY0LTQ0MDctYTBlNi1kZDVlY2NiN2U5NGQvZDRjb2MwNy0xNzJlZDZlNi1iNjJlLTRkMDgtOWI0Zi0yNjBkODU5YzQ5NzcuanBnIiwid2lkdGgiOiI8PTkwMCIsImhlaWdodCI6Ijw9NTc3In1dXX0.B9c_Q1CUpPNW-Aym4iGElniaPLPooD29gPxjiNTaUdI',
		attributes: ['Jamie', 'House Lannister', 'Sword']
	},
	{
		id: 4,
		image_url:
			'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/aa33b97a-5919-43ab-952b-ffb538b73eb3/d555k8e-0fc7cc8e-d864-4815-85df-248c7f9f74b5.jpg/v1/fill/w_800,h_800,q_75,strp/the_kingsmoot_by_marcsimonetti-d555k8e.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi9hYTMzYjk3YS01OTE5LTQzYWItOTUyYi1mZmI1MzhiNzNlYjMvZDU1NWs4ZS0wZmM3Y2M4ZS1kODY0LTQ4MTUtODVkZi0yNDhjN2Y5Zjc0YjUuanBnIiwid2lkdGgiOiI8PTgwMCIsImhlaWdodCI6Ijw9ODAwIn1dXX0.EutlTCSE7VDFaTQdp82Ye7XbvzxbNaxvDMqfnWUlJoQ',
		attributes: ['Asha', 'House Greyjoy', 'Kingsmoot']
	}
];

const PicMetric = () => {
	const [imageInfo, setImageInfo] = useState();
	const [uploadData, setUploadData] = useState();

	useEffect(() => {
		setImageInfo(fakeData);
	}, [fakeData]);

	useEffect(() => {
		if (uploadData) {
			const uploadIcon = document.getElementById('uploadIcon');
			const iconTimer = setInterval(() => {
				uploadIcon.style.visibility === 'visible'
					? (uploadIcon.style.visibility = 'hidden')
					: (uploadIcon.style.visibility = 'visible');
			}, 250);

			setTimeout(() => {
				document.getElementById('uploadIcon').style.visibility = 'visible';
				clearInterval(iconTimer);
			}, 3000);

			uploadIcon.style.visibility = 'hidden';
			uploadIcon.style.fill = 'green';
		}
	}, [uploadData]);

	const handleDelete = itemId => {
		console.log('Delete:', itemId);
	};

	const handleAnalyze = () => {
		if (!uploadData) {
			alert('Select a file before Analyze');
		}
		console.log('Analyze:', uploadData);

		axiosWithAuth()
			.post('/pics', uploadData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then(res => console.log('uploadData OK', res))
			.catch(err => console.log('uploadData FAIL', err));
	};

	const handleImageChange = () => {
		if (document.getElementById('imageUpload').files.length === 1) {
			setUploadData(document.getElementById('imageUpload').files[0]);
		} else {
			setUploadData();
		}
	};

	return !imageInfo ? (
		<div>Loading...</div>
	) : (
		<div>
			<div
				style={{
					display: 'flex',
					marginTop: '10px',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<label
					type='button'
					htmlFor='imageUpload'
					style={{ width: '40%', margin: '0px' }}
				>
					Select
				</label>
				<div style={{ width: '50px', height: '50px' }}>
					<svg
						id='uploadIcon'
						viewBox='0 0 44 44'
						style={!uploadData ? { fill: 'red' } : { fill: 'green' }}
					>
						<path d='M26.29,29.29a1,1,0,0,0,1.41,1.41l8-8a1,1,0,0,0,0-1.41l-8-8a1,1,0,1,0-1.41,1.41L32.59,21H1a1,1,0,0,0,0,2H32.59ZM43,0H7A1,1,0,0,0,6,1V16a1,1,0,0,0,2,0V2H42V42H8V28a1,1,0,0,0-2,0V43a1,1,0,0,0,1,1H43a1,1,0,0,0,1-1V1A1,1,0,0,0,43,0Z' />
					</svg>
				</div>
				<input
					onClick={handleAnalyze}
					type='submit'
					value='Analyze'
					style={{ margin: '0px', width: '40%' }}
				/>
				<input
					type='file'
					id='imageUpload'
					onChange={handleImageChange}
					accept='.jpg,.png'
					style={{ display: 'none' }}
				/>
			</div>
			<div style={{ textAlign: 'center', marginTop: '5px' }}>
				Select an image from your computer, then click Analyze.
			</div>
			{imageInfo.map(i => {
				return (
					<div
						style={{
							display: 'flex',
							border: '1px solid black',
							marginTop: '10px',
							marginBottom: '10px',
							padding: '10px'
						}}
						key={i.id}
					>
						<img
							src={i.image_url}
							style={{ width: '450px', border: '1px solid black' }}
						/>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
								marginLeft: '10px'
							}}
						>
							<div style={{ flexGrow: '1' }}>
								{i.attributes.map(a => {
									return <div key={a}>{a}</div>;
								})}
							</div>
							<div>
								<input
									onClick={() => handleDelete(i.id)}
									type='submit'
									value='Delete'
									style={{ margin: '0px', width: '100%' }}
								/>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default PicMetric;
