import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';

import elevation from 'helpers/elevation';
import SearchInput from 'components/Search/Input';
import NoResults from 'components/ui/NoResults';
import theme from 'theme';

const styles = StyleSheet.create({
  container: {
    width: theme.screenWidth,
    flexGrow: 1,
    paddingBottom: 10,
  },
  containerWithMessage: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    flex: 0,
  },
  sectionHeader: {
    marginBottom: 5,
    ...theme.fontStyle({
      fontSize: 14,
      fontWeight: '700',
    }),
  },
  footer: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerEmptyLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    backgroundColor: theme.white,
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    borderRadius: 50,
    ...elevation(3),
  },
  footerComponent: {
    paddingBottom: 10,
  },
});

export const INITIAL_PARAMS_STATE = {
  page: 1,
  search: '',
  limit: 10,
};

export const INITIAL_PAGINATION_PARAMS = {
  count: 0,
  currentPage: 1,
  links: {},
  perPage: 10,
  totalPages: 1,
};

const Listing = ({
  renderItem,
  headerComponent = null,
  emptyComponent = null,
  showSearchInput = false,
  searchKey = 'search',
  items = [],
  loading = false,
  onFetchData = () => null,
  contentContainerStyle = {},
  pagination = INITIAL_PAGINATION_PARAMS,
  dependencies = [],
  itemLayoutHeight = 80,
  ...restOfProps
}) => {
  const { t } = useTranslation();
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [params, setParams] = useState({ [searchKey]: '', ...INITIAL_PARAMS_STATE });
  const { totalPages } = pagination;
  const [_items, setItems] = useState([]);
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    onFetchData(params, searchKey);
    setRefreshing(false);
    setLoadingMore(false);
  }, [params, ...dependencies]);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  useMemo(() => {
    try {
      const { currentPage } = pagination;

      if (currentPage > 1) {
        setItems(_items.concat(items));
      } else {
        setItems(items);
      }
    } catch (error) {
      setItems(items);
    }
    setRefreshing(false);
    setLoadingMore(false);
  }, [items]);

  const emptyComponentRender = () => {
    if (loading || _loading) {
      return <View style={styles.containerEmptyLoading}>{loadingRender()}</View>;
    }

    if (emptyComponent) {
      return emptyComponent;
    }

    return <NoResults icon="alert" title={t('generic.noResultsFound')} />;
  };

  const onSearch = (searchTerm) => {
    setParams({ ...params, [searchKey]: searchTerm, page: 1 });
  };

  const loadingRender = () =>
    !refreshing ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={theme.black} size={26} />
      </View>
    ) : null;

  const footerComponentRender = () =>
    loadingMore ? (
      <View style={styles.footerComponent}>
        <ActivityIndicator color={theme.black} size={26} />
      </View>
    ) : null;

  return (
    <>
      <FlatList
        data={_items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          setParams({ ...params, page: 1 });
        }}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          const { page } = params;
          if (page < totalPages && !loadingMore && !_loading && !refreshing) {
            setLoadingMore(true);
            setParams({ ...params, page: page + 1 });
          }
        }}
        ListHeaderComponent={() => (
          <>
            {headerComponent}
            {showSearchInput && (
              <SearchInput
                handleChange={debounce(onSearch, 1000)}
                name={searchKey}
                searchValue={params[searchKey]}
                textInputProps={{
                  placeholder: t('generic.search'),
                  searchIcon: true,
                }}
              />
            )}
          </>
        )}
        ListEmptyComponent={() => emptyComponentRender()}
        ListFooterComponent={() => footerComponentRender()}
        ListHeaderComponentStyle={styles.header}
        ListFooterComponentStyle={styles.footer}
        contentContainerStyle={[styles.container, contentContainerStyle]}
        getItemLayout={(_, index) => ({ length: itemLayoutHeight, offset: itemLayoutHeight * index, index })}
        windowSize={5} // Solo renderiza 5 veces la altura de la pantalla
        initialNumToRender={10} // Solo renderiza 10 items al inicio
        maxToRenderPerBatch={10} // Carga 10 más a la vez
        updateCellsBatchingPeriod={50} // Reduce el tiempo de actualización
        removeClippedSubviews={true} // Optimiza el uso de memoria en Android
        {...restOfProps}
      />
    </>
  );
};

Listing.propTypes = {
  renderItem: PropTypes.func.isRequired,
  headerComponent: PropTypes.node,
  emptyComponent: PropTypes.node,
  showSearchInput: PropTypes.bool,
  searchKey: PropTypes.string,
  items: PropTypes.oneOfType([PropTypes.array]),
  loading: PropTypes.bool,
  onFetchData: PropTypes.func,
  contentContainerStyle: PropTypes.oneOfType([PropTypes.object]),
  pagination: PropTypes.oneOfType([PropTypes.object]),
};

export default Listing;
