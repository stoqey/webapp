import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import {
	IoIosArrowBack,
	IoIosArrowForward,
	IoIosArrowDropleftCircle,
	IoIosArrowDroprightCircle,
} from 'react-icons/io';
import {
	FiHeart,
	FiShare,
	FiBookmark,
	FiMessageCircle,
	FiMoreHorizontal,
} from 'react-icons/fi';
import { Row, Col } from 'react-flexbox-grid/dist/react-flexbox-grid';
import { Block } from 'baseui/block';
import { Modal } from 'baseui/modal';
import { Button } from 'baseui/button';
import { Avatar } from 'baseui/avatar';
import Container from 'components/UiElements/Container/Container';
import InstagramCard from 'components/UiElements/InstagramCard/InstagramCard';
import Carousel, { Slide } from 'components/UiElements/Carousel/Carousel';
import useDirection from 'hooks/useDirection';
import Comment from './Comment';
import Wrapper, {
	PrevButton,
	NextButton,
	ContentWrapper,
	Media,
	Image,
	VideoDiv,
	Content,
	Header,
	AvatarWrapper,
	FollowButton,
	Name,
	Dot,
	Body,
	CommentWrapper,
	Footer,
	SocialList,
	ListItem,
	ActivityInfo,
	NumberOFLike,
	PostTime,
	MoreButton,
} from './Posts.styled';

type MediaContent = {
	id: number;
	type: string;
	image?: string;
	video?: string;
	numberOfView?: string;
	numberOflike?: string;
	numberOfcomment: string;
};

interface PostContent extends MediaContent {
	gallery?: MediaContent[]
};

type PostsProps = {
	data: PostContent[];
	avatar: string;
	username: string;
};

const ipoData: PostsProps = {
	data: [
		{
			id: 0,
			type: "image",
			image: "/ceddy_nice.jpeg",
			numberOfcomment: "0",
			numberOfView: "0",
			numberOflike: "0"
		},
		{
			id: 1,
			type: "gallery",
			image: "/ceddy_tr.jpeg",
			numberOfcomment: "0",
			numberOfView: "0",
			numberOflike: "0",
			gallery: [
				{
					id: 3,
					type: "image",
					image: "/ceddy_tr.jpeg",
					numberOfcomment: "0",
					numberOfView: "0",
					numberOflike: "0",
				},
				{
					id: 4,
					type: "video",
					video: "/ipo_dance_03.MP4",
					numberOfcomment: "0",
					numberOfView: "0",
					numberOflike: "0"
				},
			]
		},
		{
			id: 2,
			type: "gallery",
			image: "/dance_ipo.GIF",
			numberOfcomment: "0",
			numberOfView: "0",
			numberOflike: "0",
			gallery: [
				{
					id: 2,
					type: "image",
					image: "/dance_ipo.GIF",
					numberOfcomment: "0",
					numberOfView: "0",
					numberOflike: "0",
				},
				{
					id: 0,
					type: "video",
					video: "/ipo_dance_02.MP4",
					numberOfcomment: "0",
					numberOfView: "0",
					numberOflike: "0"
				},

			]
		}

	],
	avatar: "https://www.gravatar.com/avatar/cfd6094081678e8efc4096c323d58a94.jpg?s=500",
	username: "ceddymuhoza"
}

const Posts = (props: PostsProps) => {
	const { data, avatar, username } = ipoData;
	const postsLength = data.length;
	const [selectedId, setSelectedId] = useState<number>(0);
	const [visible, setVisible] = useState(false);
	const [direction] = useDirection();

	const handleModal = (selectedP: number) => {
		setSelectedId(selectedP);
		setVisible(true);
	};

	const handlePrevPost = () => {
		if (selectedId - 1 >= 0) {
			setSelectedId(selectedId - 1);
		}

	};

	const handleNextPost = () => {
		if (selectedId + 1 <= postsLength - 1) {
			setSelectedId(selectedId + 1);
		}
	};

	const renderHtml = (data: string) => {
		return { __html: data };
	};

	const GetComponent = (item: MediaContent) => {

		if (item.type === 'image') {
			return <Image src={item.image} alt="Thumbnail" />
		};

		if (item.video) {
			return (
				<VideoDiv>
					<ReactPlayer url={item.video} playing loop light controls />
				</VideoDiv>
			)
		};

		if (item.type === 'gallery') {
			return (
				<Carousel
					bullets={true}
					options={{ direction }}
					numberOfBullets={selectedPost.gallery.length}
					carouselSelector="gallery"
					prevButton={<IoIosArrowDropleftCircle />}
					nextButton={<IoIosArrowDroprightCircle />}
				>
					{selectedPost.gallery.map((ite: MediaContent, index: number) => (
						<Slide key={`gallery-key${index}`}>
							{/* Recursive */}
							<GetComponent {...ite} />
						</Slide>
					))}
				</Carousel>
			)
		};

		return null;
	}

	const selectedPost: any = data[selectedId];

	return (
		<Wrapper>
			<Container>

				{/* Post Image here */}
				<Row>
					{data.map((post, index) => {
						return (
							<Col sm={6} md={4} key={`post-key${post.id}`}>
								<InstagramCard
									style={{ marginBottom: '20px' }}
									type={post.type}
									image={post.image}
									numberOflike={post.numberOflike && post.numberOflike}
									numberOfView={post.numberOfView && post.numberOfView}
									numberOfcomment={post.numberOfcomment}
									onClick={() => handleModal(post.id)}
								/>
							</Col>
						)
					})}
				</Row>


				<Modal
					onClose={() => {
						setVisible(false);
					}}
					closeable
					isOpen={visible}
					animate
					size="default"
					role="dialog"
					unstable_ModalBackdropScroll={true}
					overrides={{
						Root: {
							style: () => {
								return { zIndex: 9999 };
							},
						},
						Close: {
							style: () => {
								return { display: 'none' };
							},
						},
						Dialog: {
							style: () => {
								return {
									width: '100%',
									maxWidth: '815px',
									'@media only screen and (max-width: 1135px)': {
										maxWidth: '480px',
									},
									'@media only screen and (max-width: 570px)': {
										maxWidth: '380px',
									},
								};
							},
						},
					}}
				>

					<PrevButton onClick={handlePrevPost}>
						<IoIosArrowBack />
					</PrevButton>


					<NextButton onClick={handleNextPost}>
						<IoIosArrowForward />
					</NextButton>


					<ContentWrapper>
						<Media>
							<GetComponent {...selectedPost} />
						</Media>

						<Content>
							<Header>
								<AvatarWrapper>
									<Avatar name={username} size="scale1000" src={avatar} />
									<Name>{username}</Name>
									<Dot>•</Dot>
									<FollowButton>Follow</FollowButton>
								</AvatarWrapper>
								<MoreButton>
									<FiMoreHorizontal />
								</MoreButton>
							</Header>

							<Body>
								<CommentWrapper>
									{selectedPost.comments !== undefined && selectedPost.comments.length > 0
										? selectedPost.comments.map((item: any) => (
											<Comment
												key={`comment-key${item.id}`}
												role={item.role}
												avatar={item.avatar}
												name={item.username}
												content={item.comment}
												handleLike={() =>
													console.log(
														'Write like function for post.',
														selectedPost.id
													)
												}
												handleReply={() =>
													console.log(
														'Write reply function for post.',
														selectedPost.id
													)
												}
											/>
										))
										: ''}
								</CommentWrapper>
							</Body>

							<Footer>
								<SocialList>
									<ListItem>
										<FiHeart />
									</ListItem>
									<ListItem>
										<FiMessageCircle />
									</ListItem>
									<ListItem>
										<FiShare />
									</ListItem>
									<ListItem>
										<FiBookmark />
									</ListItem>
								</SocialList>
								<ActivityInfo>
									<NumberOFLike>{selectedPost.numberOflike} likes</NumberOFLike>
									<PostTime>APRIL 4th</PostTime>
								</ActivityInfo>
							</Footer>
						</Content>
					</ContentWrapper>
				</Modal>
			</Container>
		</Wrapper>
	);
};

export default Posts;
