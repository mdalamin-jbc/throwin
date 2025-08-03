import { useState } from "react";
import { useForm } from "react-hook-form";
import img from "../../../assets/images/store&staff/image.png";
import UseGetRestaurantOwnerReviews from "../../../hooks/Dashboard/RestaurantOwner/UseGetRestaurantOwnerReviews";
import UseGetReviewsReplies from "../../../hooks/Dashboard/RestaurantOwner/UseGetReviewsReplies";
import useAxiosPrivate from "../../../hooks/axiousPrivate";
import { HiReply } from "react-icons/hi";

const DaComments = () => {
  const { reviews } = UseGetRestaurantOwnerReviews();
  const [activeReviewUid, setActiveReviewUid] = useState(null);
  const { replies, refetch } = UseGetReviewsReplies({ activeReviewUid });
  const axiosPrivate = useAxiosPrivate();
  const { register, handleSubmit, reset } = useForm();

  const [replyingToReplyId, setReplyingToReplyId] = useState(null);

  const handleReviewClick = (uid) => {
    setActiveReviewUid(uid);
    setReplyingToReplyId(null); // reset reply state when switching reviews
  };

  const onSubmit = async (data) => {
    try {
      const response = await axiosPrivate.post("restaurant-owner/reply", {
        review_uid: activeReviewUid,
        message: data.reply,
      });

      reset();
      setReplyingToReplyId(null);
      refetch();
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  return (
    <div>
      <h2 className="font-semibold text-[27px] text-[#73879C]">コメント</h2>
      <div className="bg-white mt-[27px] rounded-lg pb-8">
        <div className="flex pt-10">
          {/* Review List */}
          <div>
            {reviews.map((review) => {
              const reviewDate = new Date(review?.created_at);
              const formattedTime = reviewDate.toLocaleTimeString("ja-JP", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              });

              const isActive = review.uid === activeReviewUid;

              return (
                <div
                  key={review.uid}
                  className={`flex border-r py-4 cursor-pointer ${
                    isActive ? "bg-[#f2f4f7]" : "bg-[#Ffff]"
                  }`}
                  onClick={() => handleReviewClick(review.uid)}
                >
                  <div className="px-6">
                    <img
                      src={img}
                      className="rounded-full w-[90px] h-[60px]"
                      alt="Reviewer"
                    />
                  </div>
                  <div className="w-full flex justify-between">
                    <div className="text-[#434343]">
                      <h5 className="font-semibold text-lg">
                        {review?.consumer_name}
                      </h5>
                      <p className="font-light">{review?.message}</p>
                    </div>
                    <p className="text-[#73879C] mr-6">{formattedTime}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reply Panel */}
          <div className="ml-6">
            <h4 className="font-semibold text-2xl text-[#49BBDF] mb-6">
              応援メッセージ
            </h4>

            <div className="w-[400px]">
              {activeReviewUid && (
                <>
                  {/* Always show the original review */}
                  <div className="mt-4 border-b-[2px] border-[#E0EAED] pb-2">
                    <h4 className="flex justify-between mt-4 font-medium text-xs text-[#9C9C9C]">
                      <span>
                        ユーザーネーム：
                        {reviews.find((r) => r.uid === activeReviewUid)
                          ?.consumer_name || "ゲスト"}
                      </span>
                      <span>
                        {new Date(
                          reviews.find(
                            (r) => r.uid === activeReviewUid
                          )?.created_at
                        ).toLocaleDateString("ja-JP")}
                      </span>
                    </h4>
                    <div className="flex justify-between items-center">
                      <h2 className="font-medium text-sm text-[#44495B] mt-2">
                        {
                          reviews.find((r) => r.uid === activeReviewUid)
                            ?.message
                        }
                      </h2>
                      {replyingToReplyId !== "main" && (
                        <HiReply
                          className="cursor-pointer text-[#49BBDF]"
                          onClick={() => setReplyingToReplyId("main")}
                        />
                      )}
                    </div>

                    {/* Reply to main review */}
                    {replyingToReplyId === "main" && (
                      <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
                        <div className="flex items-center border border-gray-300 rounded w-full">
                          <input
                            {...register("reply", { required: true })}
                            placeholder="返信を入力してください"
                            className="p-2 text-sm w-full outline-none"
                          />
                          <button
                            type="submit"
                            className="p-2 text-gray-600 hover:text-black"
                          >
                            <HiReply />
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Show replies if available */}
                  {replies?.review_replies?.length > 0 &&
                    replies.review_replies.map((reply, index) => {
                      const isLastReply =
                        index === replies.review_replies.length - 1;
                      return (
                        <div
                          key={index}
                          className="mt-4 border-b-[2px] border-[#E0EAED] pb-2"
                        >
                          <h4 className="flex justify-between mt-4 font-medium text-xs text-[#9C9C9C]">
                            <span>
                              ユーザーネーム：
                              {reply?.restaurant_owner_name ||
                                reply?.consumer_name ||
                                "ゲスト"}
                            </span>
                            <span>
                              {new Date(reply?.created_at).toLocaleDateString(
                                "ja-JP"
                              )}
                            </span>
                          </h4>
                          <div className="flex justify-between items-center">
                            <h2 className="font-medium text-sm text-[#44495B] mt-2">
                              {reply?.message}
                            </h2>
                            {isLastReply && replyingToReplyId !== reply?.id && (
                              <HiReply
                                className="cursor-pointer text-[#49BBDF]"
                                onClick={() => setReplyingToReplyId(reply?.id)}
                              />
                            )}
                          </div>

                          {/* Only show input if replying to the last reply */}
                          {isLastReply && replyingToReplyId === reply?.id && (
                            <form
                              onSubmit={handleSubmit(onSubmit)}
                              className="mt-2"
                            >
                              <div className="flex items-center border border-gray-300 rounded w-full">
                                <input
                                  {...register("reply", { required: true })}
                                  placeholder="返信を入力してください"
                                  className="p-2 text-sm w-full outline-none"
                                />
                                <button
                                  type="submit"
                                  className="p-2 text-gray-600 hover:text-black"
                                >
                                  <HiReply />
                                </button>
                              </div>
                            </form>
                          )}
                        </div>
                      );
                    })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaComments;
