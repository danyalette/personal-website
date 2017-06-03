
(function(window){
	
	var commensurate = function(obj){

		function equalNumOfSubPaths(array_of_path_subpaths){
				var most_subpaths = 0; 
				var new_array = []; 
	
				array_of_path_subpaths.forEach(function(path){
					if (path.length > most_subpaths) most_subpaths = path.length; 
				}); 
				array_of_path_subpaths.forEach(function(path){
					var this_path = path; 
					if (path.length < most_subpaths) {					
						var num = most_subpaths - path.length;
						while (num){
							this_path.splice(0, 0, ["m0 0"]); 
							num--;
						}
						
					}
					new_array.push(this_path); 
				}); 
	
				return new_array; 
		}

		function sortSubPaths(array_of_paths, interleaving){
			var sorted_paths = []; 
			if (interleaving === "none"){
				sorted_paths = array_of_paths; 
			} else if (interleaving === "trans") {
					array_of_paths.forEach(function(path,index){
					if (index%2 === 0){
	    				var sorted_path = path.sort(function(a,b){
		        			return b.length - a.length; 
						});
					}
					else {
						var sorted_path = path.sort(function(a,b){
		        			return a.length - b.length; 
						});
					}
					sorted_paths.push(sorted_path);
					});
			} else {
					 array_of_paths.forEach(function(path){
			    		var sorted_path = path.sort(function(a,b){
			        	return b.length - a.length; 
						});
						sorted_paths.push(sorted_path);
					});
				}
			
		    return sorted_paths;  
		};

		function padSubPaths(paths_array, interleaving){
	
			var num_subpaths = paths_array[0].length; 
	
			for(i=0;i<num_subpaths;i++){
				var subpath_command_num = 0; 
				for(o=0;o<paths_array.length;o++){
					if (paths_array[o][i].length > subpath_command_num) subpath_command_num = paths_array[o][i].length; 
				}
				for(o=0;o<paths_array.length;o++){
					if (paths_array[o][i].length < subpath_command_num) {
						var dif = subpath_command_num - paths_array[o][i].length;
						var num = 2;
						if (interleaving === "mid") num = parseInt(paths_array[o][i].length/3);
						else if (interleaving === "high") num = paths_array[o][i].length;
						while (dif){
							
							paths_array[o][i].splice(num*2,0,"c0 0 0 0 0 0");
							num++; 
							dif--; 
						}
						
					} 
				}
			}
			return paths_array; 
	
		}
		
		
		var parsed_paths = []; 
		
		var array_of_paths = obj.paths;
		var subpath_interleave = obj.subpath_interleave;
		var command_interleave = obj.command_interleave; 
		
		array_of_paths.forEach(function(path){
			
			var info = new SVGPathInfo(path);
			info = new SVGPathInfo(info.getGlobalCubicBezier()); 
			var array = info.getSubPaths(true); 
			parsed_paths.push(array); 
		}); 

		var padded_paths = equalNumOfSubPaths(parsed_paths);
		var sorted_padded_paths = sortSubPaths(padded_paths, subpath_interleave); 
		var padded_paths_padded_subpaths = padSubPaths(sorted_padded_paths, command_interleave); 
		
		//convert back to strings 
		var commensurate_strings = []; 
		
		padded_paths_padded_subpaths.forEach(function(path){
			var string = path.join();
			var gcb = SVGPathInfo(string).getGlobalCubicBezier(); 
			commensurate_strings.push(gcb);
		}); 
		
		return commensurate_strings;
		
		};

		window.commensurate = commensurate; 


})(window); 

