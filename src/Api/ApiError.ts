


export function getFriendlyErrorMessage(error: any) {
  switch (error.code) {
    case "23502":
      return "Some required fields are missing. Please complete all shipping details.";

    case "23503":
      return "Some linked data is missing. Please refresh the page and try again.";

    case "23505":
      return "This item already exists. Try updating instead.";

    case "42501":
    case "401":
      return "You don’t have permission to perform this action.";

    default:
      return "Something went wrong. Please try again.";
  }
}

export function handleUXError(error: any) {
  const friendly = getFriendlyErrorMessage(error);

  console.error("🔥 Supabase Error:", {
    code: error.code,
    message: error.message,
    details: error.details,
    hint: error.hint,
  });

  throw new Error(friendly);
}
