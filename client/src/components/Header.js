import Navigation from './Navigation';

export default function Header() {
	return (
		<header>
			<nav className='w-full navbar bg-base-300 justify-center flex-col'>
				<a href='/' className='text-xl font-bold'>
					My App Name
				</a>
				<Navigation />
			</nav>
		</header>
	);
}
