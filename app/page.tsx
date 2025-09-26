import HomeAvatar from '@/components/home-avatar';
import dayjs from 'dayjs';
import Link from 'next/link';
import { getPostsList, sortByTime } from './posts/utils';

export default async function Home() {
	const res = await getPostsList();
	const list = sortByTime(res);

	return (
		<>
			<HomeAvatar />

			<div>
				{Object.keys(list)
					.reverse()
					.map(year => {
						return (
							<div key={year}>
								<div className="h-20 select-none relative pointer-events-none">
									<span className="text-9xl text-transparent absolute -left-12 [-webkit-text-stroke:2px_#aaa] dark:[-webkit-text-stroke:2px_#fff] top-7 font-bold opacity-10">
										{year}
									</span>
								</div>
								{list[year].map(item => (
									<div
										key={item.slug}
										className="flex"
									>
										<Link
											href={`/posts/${item.slug}`}
											className="flex gap-x-2 items-center pt-1 pb-3 text-black dark:text-white opacity-60 hover:opacity-90"
										>
											<span className="text-lg">{item.metadata.title}</span>
											<span className="text-sm opacity-70">
												{dayjs(item.metadata.date).format('MM-DD')} ·{' '}
												{item.readingTime}
											</span>
										</Link>
									</div>
								))}
							</div>
						);
					})}
			</div>
		</>
	);
}
