import 'server-only';


export async function apiRequest(
    endpoint, 
    method = 'GET',
    body = null,
    contentType = 'application/json',
    requiresAuth = false) {
    let token;

    const url = new URL(endpoint)

    const options = {
      method,
      headers: {}
    }

    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    if(contentType == 'application/json'){
      options.headers['Content-Type'] = 'application/json'
    }

    if (body) {
      options.body = contentType === 'application/json' ? JSON.stringify(body) : body
    }

    console.log('🚀 API Request:', {
        endpoint,
        method,
        body,
        headers: options.headers
    });
  
    const res = await fetch(url, options)

    console.log('📡 API Response:', {
        status: res.status,
        statusText: res.statusText,
        contentType: res.headers.get('content-type')
    });

    if (!res.ok) {
      let errorData;
      const contentType = res.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        errorData = await res.json();
      } else {
        // Si no es JSON, obtener como texto para debug
        const textResponse = await res.text();
        console.error('🚨 Non-JSON response received:', textResponse.substring(0, 200) + '...');
        throw new Error(`Server returned HTML instead of JSON. Status: ${res.status}`);
      }
      
      console.error('🚨 API Error:', errorData);
      throw new Error(`${errorData.message || 'Error desconocido'}`)
    }
  
    const isJson = res.headers.get('content-type')?.includes('application/json')
    const data = isJson ? await res.json() : null
    
    console.log('✅ API Success:', data);
    
    return {
      data,
      headers: {
        totalCount: res.headers.get('x-total-count'),
        contentType: res.headers.get('content-type'),
      },
    }
  }