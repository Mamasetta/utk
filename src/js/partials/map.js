function $(catalogMap) {
	return document.getElementById(catalogMap);
}
var catalogMap = {};

catalogMap.pics = null;
catalogMap.map = null;
catalogMap.markerClusterer = null;
catalogMap.markers = [];
catalogMap.infoWindow = null;

catalogMap.init = function() {
	var latlng = new google.maps.LatLng(33.347316, -115.729235);
	var options = {
		'zoom': 8,
		'center': latlng,
		zoomControl: true,
		 zoomControlOptions: {
			style: google.maps.ZoomControlStyle.LARGE,
			position: google.maps.ControlPosition.LEFT_TOP
		},
		streetViewControl: true,
		streetViewControlOptions: {
			position: google.maps.ControlPosition.LEFT_TOP
		},
		scaleControl: true,
		mapTypeControlOptions: {
			mapTypeIds : ["roadmap"]
		},
		styles: [
					{
						"featureType": "administrative",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#a7a7a7"
							}
						]
					},
					{
						"featureType": "administrative",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"visibility": "on"
							},
							{
								"color": "#737373"
							}
						]
					},
					{
						"featureType": "landscape",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"visibility": "on"
							},
							{
								"color": "#e5e5e5"
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"visibility": "on"
							},
							{
								"color": "#d2d2d2"
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "labels",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "labels.icon",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#696969"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "labels.icon",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#ffffff"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"visibility": "on"
							},
							{
								"color": "#b3b3b3"
							}
						]
					},
					{
						"featureType": "road.arterial",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#ffffff"
							}
						]
					},
					{
						"featureType": "road.arterial",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"color": "#d6d6d6"
							}
						]
					},
					{
						"featureType": "road.local",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"visibility": "on"
							},
							{
								"color": "#ffffff"
							},
							{
								"weight": 1.8
							}
						]
					},
					{
						"featureType": "road.local",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"color": "#d7d7d7"
							}
						]
					},
					{
						"featureType": "transit",
						"elementType": "all",
						"stylers": [
							{
								"color": "#808080"
							},
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#d3d3d3"
							}
						]
					}
				],
	};


	catalogMap.map = new google.maps.Map($('map'), options);
	catalogMap.pics = data.photos;

	catalogMap.infoWindow = new google.maps.InfoWindow({ maxWidth: 243 });

	catalogMap.showMarkers();
	
};

catalogMap.showMarkers = function() {
	catalogMap.markers = [];



	var panel = $('markerlist');
	panel.innerHTML = '';

	for (var i = 0; i < 10; i++) {
		var titleText = catalogMap.pics[i].photo_title;
		var bedroomText = catalogMap.pics[i].bedroom;
		var bathroomText = catalogMap.pics[i].bathroom;
		var infText = catalogMap.pics[i].inf;
		var priceText = catalogMap.pics[i].price;
		var termText = catalogMap.pics[i].term;
		var conditionsText = catalogMap.pics[i].conditions;
		var photo_file_urlImg = catalogMap.pics[i].photo_file_url;
		var photo_file_alt = catalogMap.pics[i].photo_file_alt;
		var photo_file_title = catalogMap.pics[i].photo_file_title;
		if (titleText === '') {
			titleText = 'No title';
		}

		var list = document.createElement('DIV');
		var wrap = document.createElement('A');
		var img_title = document.createElement('DIV');
		var title = document.createElement('h3');
		var bedroom = document.createElement('SPAN');
		var bathroom = document.createElement('SPAN');
		var inf = document.createElement('SPAN');
		var price_block = document.createElement('DIV');
		var price = document.createElement('SPAN');
		var term = document.createElement('SPAN');
		var conditions = document.createElement('SPAN');
		var photo_file_url = document.createElement('SPAN');

		wrap.href = '#';
		wrap.className = 'wrap_listen';
		list.className = 'col-lg-6 col-md-12';
		title.className = 'title';
		img_title.className = 'image_title';
		price_block.className = 'price_block';
		title.innerHTML = titleText;
		bedroom.innerHTML = bedroomText;
		bathroom.innerHTML = bathroomText;
		inf.innerHTML = infText;
		price.innerHTML = priceText;
		price.className = 'price';
		term.innerHTML = termText;
		conditions.innerHTML = conditionsText;
		conditions.className = 'conditions';
		photo_file_url.innerHTML = '<img src="' + photo_file_urlImg + '" alt="' + photo_file_alt + '" title="' + photo_file_title + '" class="inner_img" /><img src="images/temp.jpg" class="wrap_height" />';
		photo_file_url.className = 'wrap_img';

		panel.appendChild(list);
		list.appendChild(wrap);
		wrap.appendChild(img_title);
		wrap.appendChild(price_block);
		img_title.appendChild(title);
		img_title.appendChild(bedroom);
		img_title.appendChild(bathroom);
		img_title.appendChild(inf);
		price_block.appendChild(price);
		price_block.appendChild(term);
		price_block.appendChild(conditions);
		wrap.appendChild(photo_file_url);
		
		var latLng = new google.maps.LatLng(catalogMap.pics[i].latitude,
				catalogMap.pics[i].longitude);

		var imageUrl = 'http://pagecreate.ru/marker.png';
		var markerImage = new google.maps.MarkerImage(imageUrl,
				new google.maps.Size(32, 41));

		function drop() {
		for (var i = 0; i < neighborhoods.length; i++) {
			addMarker(neighborhoods[i], i * 200);
		}
		};
		var marker = new google.maps.Marker({
			'position': latLng,
			'icon': markerImage,
			animation: google.maps.Animation.DROP
		});



		var fn = catalogMap.markerClickFunction(catalogMap.pics[i], latLng);
		google.maps.event.addListener(marker, 'click', fn);
		google.maps.event.addDomListener(list, 'mouseenter', fn);
		catalogMap.markers.push(marker);
	}

	window.setTimeout(catalogMap.time, 0);


};

catalogMap.markerClickFunction = function(pic, latlng) {
	return function(e) {
		e.cancelBubble = false;
		e.returnValue = false;
		if (e.stopPropagation) {
			e.stopPropagation();
			e.preventDefault();
		}
		var title = pic.photo_title;
		var url = pic.photo_url;
		var fileurl = pic.photo_file_url;
		var filealt = pic.photo_file_alt;
		var filetitle = pic.photo_file_title;
		var subtitle = pic.subtitle;
		var price = pic.price
		var price = pic.term

		var infoHtml = '<div class="info"><div class="info-body">' +
			'<img src="' +
			fileurl + '" alt="' + filealt + '" title="' + filetitle + '" class="info-img"/></div>' +
			'<h3>' + title +'</h3>' +
			'<p class="subtitle">' + pic.subtitle +
			'</p>' + '<p class="subtitle_price">' + pic.price +
			'</p>' + '<p class="term">' + pic.term +
			'</p>';

		catalogMap.infoWindow.setContent(infoHtml);
		catalogMap.infoWindow.setPosition(latlng);
		catalogMap.infoWindow.open(catalogMap.map);
	};
};

catalogMap.time = function() {
	catalogMap.markerClusterer = new MarkerClusterer(catalogMap.map, catalogMap.markers);
};

google.maps.event.addDomListener(window, 'load', initialize);
