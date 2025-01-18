const DeSeetings = () => {
  return (
    <div>
      <h2 className="font-semibold text-[27px] text-[#73879C]">設定</h2>
      <div className="bg-white mt-[27px] rounded-xl pb-8 mr-[54px]">
        <h4 className="font-semibold text-[18px] text-[#73879C] pt-[30px] pl-[33px] pb-[21px] ">
          ご登録情報の閲覧・編集
        </h4>
        <div className="border-b-[3px] mx-5"></div>

        <div className="mx-[33px]">
          <div className="overflow-x-auto mt-6">
            <table className="table   font-semibold  text-[#58687A]">
              {/* head */}

              <tbody>
                {/* row 1 */}
                <tr className="hover ">
                  <td>企業名・屋号</td>
                  <td>企業名・屋号</td>
                </tr>
                {/* row 2 */}
                <tr className="hover ">
                  <td>代表電話番号</td>
                  <td>000-0000-0000s</td>
                </tr>
                {/* row 3 */}
                <tr className="hover ">
                  <td>所在地</td>
                  <td>〒555-0000 大阪市〇〇</td>
                </tr>
                {/* row 4 */}
                <tr className="hover ">
                  <td>業種</td>
                  <td>バスケットボールチーム運営</td>
                </tr>
                {/* row 5 */}
                <tr className="hover ">
                  <td>法人番号</td>
                  <td>000000000000</td>
                </tr>
                {/* row 6 */}
                <tr className="hover ">
                  <td>インボイス適格請求書番号</td>
                  <td>T000000000000</td>
                </tr>
                {/* row 7 */}
                <tr className="hover ">
                  <td>ご担当者名</td>
                  <td>山田　太郎</td>
                  <td className=" text-center">
                    <p className="border py-1">情報の編集</p>
                  </td>
                </tr>
                {/* row 8 */}
                <tr className="hover ">
                  <td>メールアドレス</td>
                  <td>aaa@free-company.co.jp</td>
                  <td className=" text-center">
                    <p className="border py-1 px-[14px]">
                      メールアドレスの変更
                    </p>
                  </td>
                </tr>
                {/* row 9 */}
                <tr className="hover ">
                  <td>パスワード</td>
                  <td>********</td>
                  <td className=" text-center">
                    <p className="border py-1 px-[14px]">パスワードの変更</p>
                  </td>
                </tr>
                {/* row 10 */}
                <tr className="hover ">
                  <td>振込先口座情報</td>
                  <td>三菱UFJ銀行　あいう支店　普通　3329580</td>
                  <td className=" text-center">
                    {" "}
                    <p className="border py-1 px-[14px]">情報の編集</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeSeetings;
