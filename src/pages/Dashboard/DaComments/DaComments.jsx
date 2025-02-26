import img from "../../../assets/images/store&staff/image.png";

const DaComments = () => {
  return (
    <div>
      <h2 className="font-semibold text-[27px] text-[#73879C]">コメント</h2>
      <div className="bg-white mt-[27px] rounded-lg pb-8  ">
        <div className="flex pt-10">
          <div>
            <div className="flex border-r bg-[#F8F9FB]  py-4">
              <div className="px-6">
                <img
                  src={img}
                  className="rounded-full w-[60px] h-[60px]"
                  alt=""
                />
              </div>
              <div className="text-[#434343]">
                <h5 className="font-semibold text-lg ">かりん</h5>
                <p className="font-light">メッセージが届いています。</p>
              </div>
              <div className="ml-[19px] mr-4 text-[#73879C]">
                <p>04:04</p>
              </div>
            </div>
            <div className="flex border-r   py-4">
              <div className="px-6">
                <img
                  src={img}
                  className="rounded-full w-[60px] h-[60px]"
                  alt=""
                />
              </div>
              <div className="">
                <h5 className="font-semibold text-lg">かりん</h5>
                <p className="font-light">メッセージが届いています。</p>
              </div>
              <div className="ml-[19px]">
                <p>04:04</p>
              </div>
            </div>
            <div className="flex border-r   py-4">
              <div className="px-6">
                <img
                  src={img}
                  className="rounded-full w-[60px] h-[60px]"
                  alt=""
                />
              </div>
              <div className="">
                <h5 className="font-semibold text-lg">かりん</h5>
                <p className="font-light">メッセージが届いています。</p>
              </div>
              <div className="ml-[19px]">
                <p>04:04</p>
              </div>
            </div>
          </div>
          <div className="ml-6">
            <h4 className="font-semibold text-2xl text-[#49BBDF] mb-6">
              応援メッセージ
            </h4>
            <div className="w-[400px]">
              <div className="mt-4 border-b-[2px] border-[#E0EAED]">
                <h4 className="flex justify-between mt-4 font-medium text-xs text-[#9C9C9C]">
                  <span>ユーザーネーム：BDdD</span> <span>2024/2/1</span>
                </h4>
                <h2 className="font-medium text-sm text-[#44495B] mt-2 mb-[17px]">
                  いつも頑張っている姿に感動してます！
                </h2>
              </div>
              <div className="mt-4 border-b-[2px] border-[#E0EAED]">
                <h4 className="flex justify-between mt-4 font-medium text-xs text-[#9C9C9C]">
                  <span>ユーザーネーム：BDdD</span> <span>2024/2/1</span>
                </h4>
                <h2 className="font-medium text-sm text-[#44495B] mt-2 mb-[17px]">
                  いつも頑張っている姿に感動してます！
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaComments;
