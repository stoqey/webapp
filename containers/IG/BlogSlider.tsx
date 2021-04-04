import React, { useState } from 'react';
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
	Video,
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

type PostsProps = {
	data: {
		id: string;
		type: string;
		image: string;
		numberOfView?: string;
		numberOflike?: string;
		numberOfcomment: string;
	};
	featuredImage: string;
	avatar: string;
	username: string;
};

const ipoData: PostsProps = {
	data: {
		id: "ipo",
		type: "image",
		image: "https://scontent-ort2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p750x750/167575959_583791149676414_7501016179987055889_n.jpg?tp=1&_nc_ht=scontent-ort2-1.cdninstagram.com&_nc_cat=106&_nc_ohc=exS3XRJz8_gAX-saWYL&edm=AP_V10EAAAAA&ccb=7-4&oh=8995171621293b632e00ca69de894dd9&oe=608EEC2A&_nc_sid=4f375e",
		numberOfcomment: "0",
		numberOfView: "0",
		numberOflike: "0"
	},
	featuredImage: "https://www.gravatar.com/avatar/cfd6094081678e8efc4096c323d58a94.jpg?s=500",
	avatar: "https://www.gravatar.com/avatar/cfd6094081678e8efc4096c323d58a94.jpg?s=500",
	username: "ceddymuhoza"
}

const Posts = (props: PostsProps) => {
	const { data, avatar, username, featuredImage, data: post } = ipoData;
	const [postLimit, setPostLimit] = useState(9);
	const [currentPost, setCurrentPost] = useState(1);
	const [visible, setVisible] = useState(false);
	const [direction] = useDirection();

	const handleModal = (id: number) => {
		setCurrentPost(id);
		setVisible(true);
	};

	const handlePrevPost = () => {
		setCurrentPost(currentPost - 1);
	};

	const handleNextPost = () => {
		setCurrentPost(currentPost + 1);
	};

	const renderHtml = (data: string) => {
		return { __html: data };
	};

	let newData: any = data;

	return (
		<Wrapper>
			<Container>

				{/* Post Image here */}
				<Row>
					{/* <img
						src={featuredImage}
						width="100%"
						alt="Banner"
					/> */}


					<Col sm={6} md={4} key={`post-key${post.id}`}>
						<InstagramCard
							style={{ marginBottom: '20px' }}
							type={post.type}
							image={post.image}
							numberOflike={post.numberOflike && post.numberOflike}
							numberOfView={post.numberOfView && post.numberOfView}
							numberOfcomment={post.numberOfcomment}
							onClick={() => handleModal(parseInt(post.id))}
						/>
					</Col>
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

					<PrevButton>
						<IoIosArrowBack />
					</PrevButton>


					<NextButton onClick={handleNextPost}>
						<IoIosArrowForward />
					</NextButton>


					<ContentWrapper>
						<Media>
							{newData.type === 'image' && (
								<Image src={newData.image} alt="Thumbnail" />
							)}
							{newData.type === 'video' && (
								<Video
									className="video-container"
									dangerouslySetInnerHTML={renderHtml(newData.video)}
								></Video>
							)}
							{newData.type === 'gallery' && (
								<Carousel
									bullets={true}
									options={{ direction }}
									numberOfBullets={newData.gallery.length}
									carouselSelector="gallery"
									prevButton={<IoIosArrowDropleftCircle />}
									nextButton={<IoIosArrowDroprightCircle />}
								>
									{newData.gallery.map((item: string, index: number) => (
										<Slide key={`gallery-key${index}`}>
											<img src={item} alt={'post'} />
										</Slide>
									))}
								</Carousel>
							)}
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
									{newData.comments !== undefined && newData.comments.length > 0
										? newData.comments.map((item: any) => (
											<Comment
												key={`comment-key${item.id}`}
												role={item.role}
												avatar={item.avatar}
												name={item.username}
												content={item.comment}
												handleLike={() =>
													console.log(
														'Write like function for post.',
														newData.id
													)
												}
												handleReply={() =>
													console.log(
														'Write reply function for post.',
														newData.id
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
									<NumberOFLike>{newData.numberOflike} likes</NumberOFLike>
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
