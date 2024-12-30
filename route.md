: => colon is used to show paramters

- / => index(where user's enter a movie title to search)
  - /wishlist => a page to display the user's wishlist
  - /search/:searchTitle(parameter) => used to display the fetched results.
  - /search/:searchTitle/:id => used to display the details page of a single movie

<>
<Route path="/" element={<HomePage />}>
<Route
index
element={<PlaceHolder />}
loader={HomePageLoader}
errorElement={<ErrorElement width="100%" height="90vh" backgroundColor="whitesmoke" />}
/>
<Route path="search">
<Route path=":searchTitle" element={<SearchResults />} />
<Route path=":searchTitle/:id" element={<MovieDetails />} />
</Route>
</Route>
<Route path="/watch-list" element={<WatchList />} />
</>
