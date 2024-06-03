const validate = (validators) => {
  return async (ctx, next) => {
    for (const validator of validators) {
      const { field, error } = await validator(ctx.request.body);
      if (error) {
        console.log("error in validate", error);
        ctx.response.status = 400;

        ctx.response.body = { error, field };
        return;
      }
    }
    await next();
  };
};
export default validate;
