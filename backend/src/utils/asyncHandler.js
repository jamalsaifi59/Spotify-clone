const asyncHandler = (requestHandler) => {
    return (req,res) => {
        Promise.resolve(requestHandler(req,res)).catch((err) => (err))
    }

}
export {asyncHandler}
