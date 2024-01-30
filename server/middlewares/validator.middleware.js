const validate = (validators) => {
  return async (ctx, next) => {
    const errors = [];
    for (const validator of validators) {
      const error = await validator(ctx.request.body);
      if (error) {
        errors.push(error);
      }
    }
    if (errors.length > 0) {
      console.log("Error in validate: ", errors);
      ctx.status = 400;
      ctx.body = {
        errors,
      };
      return;
    }
    await next();
  };
};
export default validate;
