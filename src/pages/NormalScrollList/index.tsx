import { useEffect, useRef, useState } from 'react'

interface Item {
	id: number
	name: string
}

const generateItems = (count: number, offset: number): Item[] => {
	return Array.from({ length: count }, (_, index) => ({
		id: offset + index,
		name: `Item ${offset + index + 1}`,
	}))
}

// 비동기 더미 데이터 페칭 시뮬레이션
const fetchData = async (page: number, pageSize: number): Promise<Item[]> => {
	// 0.5초 지연으로 비동기 API 호출 시뮬레이션
	await new Promise(resolve => setTimeout(resolve, 500))
	return generateItems(pageSize, page * pageSize)
}

const NormalScrollList = () => {
	const [items, setItems] = useState<Item[]>([])
	const [page, setPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const parentRef = useRef<HTMLDivElement>(null)
	const pageSize = 20 // 페이지당 아이템 수

	// 초기 데이터 로드
	useEffect(() => {
		const loadInitialData = async () => {
			setIsLoading(true)
			const newItems = await fetchData(0, pageSize)
			setItems(newItems)
			setIsLoading(false)
		}
		loadInitialData()
	}, [])

	// 무한 스크롤: 스크롤 끝 감지
	useEffect(() => {
		const loadMore = async () => {
			if (isLoading) return
			const scrollElement = parentRef.current
			if (!scrollElement) return

			const { scrollHeight, scrollTop, clientHeight } = scrollElement
			// 스크롤이 80% 이상 내려갔을 때 데이터 로드
			if (scrollTop + clientHeight >= scrollHeight * 0.8) {
				setIsLoading(true)
				const newItems = await fetchData(page, pageSize)
				setItems(prevItems => [...prevItems, ...newItems])
				setPage(prevPage => prevPage + 1)
				setIsLoading(false)
			}
		}

		const scrollElement = parentRef.current
		if (scrollElement) {
			scrollElement.addEventListener('scroll', loadMore)
			return () => scrollElement.removeEventListener('scroll', loadMore)
		}
	}, [page, isLoading])

	return (
		<div className="container">
			<h1>무한 스크롤</h1>
			<p>렌더링된 DOM 개수: {items.length}</p>
			<div
				ref={parentRef}
				className="list-container"
				style={{
					height: '450px',
					width: '100%',
					overflow: 'auto',
				}}
			>
				{items.map(item => (
					<div key={item.id} className="list-item">
						{item.name}
					</div>
				))}
			</div>
			{isLoading && <h1 className="loading">Loading more items...</h1>}
		</div>
	)
}

export default NormalScrollList
