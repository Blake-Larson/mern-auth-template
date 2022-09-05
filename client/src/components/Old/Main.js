//import Lesson from './Lesson';

export default function Main(props) {
	console.log(props.data?.students);
	const studentList = props.data?.students.map((item, i) => {
		return (
			<div key={i}>
				<p>{item.name}</p>
			</div>
		);
	});
	return <main>{studentList}</main>;
}
