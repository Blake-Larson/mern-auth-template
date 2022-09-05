export default function Header() {
	return (
		<header>
			<nav className='w-full navbar bg-base-300'>
				<div className='flex-1 px-2 mx-2'>
					<h1 className='text-xl font-bold'>Dashboard</h1>
				</div>
				<div className='hidden md:flex md:flex-none px-2 mx-2'>
					<h1 className='text-xl font-bold'>Music Studio Name</h1>
				</div>
			</nav>
		</header>
	);
}
