const ErrorPage = ({ error }) => {
  return (
    <section>
      <p>
        {error
          ? `${error.response.status} - ${error.response.data.msg}`
          : "404 - Path not found"}
      </p>
    </section>
  );
};

export default ErrorPage;
